import Cart from "../models/cartModel.js";
import Holds from "../models/holdsModel.js";
import mongoose from "mongoose";

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
} 

export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getCartByCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.find({ customer_id: id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createCart = async (req, res) => {
  const { customer_id, store_number, item_number, quantity } = req.body;
  const newCart = new Cart({ customer_id, store_number, item_number, quantity });
  try {
    await newCart.save();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getCartByStore = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.find({ store_number: id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// export const addToCart = async (req, res) => {
//   const { customer_id, store_number, item_number, quantity } = req.body;
//   const addToCart = new Cart({ customer_id, store_number, item_number, quantity });
  
//   try {
//     const holds = await Holds.findOne({ customer_id, store_number, item_number });
//     if (holds && quantity >= holds.quantity) {
//       return res.status(400).json({ message: 'Quantity exceeds available holds.' });
//     }
//     await addToCart.save();
//     res.status(200).json(addToCart);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   } 
// }
;
export const changeQuantity = async (req, res) => {
  const { customer_id, store_number, item_number, previousQuantity, newQuantity } = req.body;
  try {
    const cartItem = await Cart.findOne({ customer_id, store_number, item_number });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    const holds = await Holds.findOne({ customer_id, store_number, item_number });
    if (!holds) {
      return res.status(404).json({ message: 'Holds not found.' });
    }

    const difference = newQuantity - previousQuantity;

    if (difference > 0) {
      if (difference > holds.quantity) {
        return res.status(400).json({ message: 'Quantity exceeds available holds.' });
      }
      holds.quantity -= difference;
    } else if (difference < 0) {
      holds.quantity += difference;
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();
    await holds.save();
    return res.status(200).json({ message: 'Quantity updated successfully.', cartItem });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const removeFromCart = async (req, res) => {
  const { customer_id, store_number, item_number, quantity } = req.body;
  try {
    const cartItem = await Cart.findOneAndDelete({ customer_id, store_number, item_number, quantity });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }
    const holds = await Holds.findOne({ customer_id, store_number, item_number });
    if (!holds) {
      return res.status(404).json({ message: 'Holds not found.' });
    }
    holds.quantity += quantity;
    await holds.save();
    return res.status(200).json({ message: 'Cart item removed successfully.', cartItem });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No cart with id: ${id}`);
  await Cart.findByIdAndRemove(id);
  res.json({ message: "Cart deleted successfully." });
};


