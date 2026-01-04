const Address = require('../models/Address');
const User = require('../models/User');

const getAddresses = async (req, res) => {
  try {
    console.log('✅ GET /api/addresses - User:', req.user._id);
    const addresses = await Address.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log('✅ Found', addresses.length, 'addresses');
    res.json(addresses);
  } catch (error) {
    console.error('❌ Get addresses error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    console.log('✅ POST /api/addresses');
    const { fname, lname, email, phone, alternativePhone, address, houseNo, district, state, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const newAddress = await Address.create({
      user: req.user._id,
      fname,
      lname,
      email,
      phone,
      alternativePhone,
      address,
      houseNo,
      district,
      state,
      isDefault: isDefault || false
    });

    await User.findByIdAndUpdate(req.user._id, { $push: { addresses: newAddress._id } });
    console.log('✅ Address created:', newAddress._id);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('❌ Add address error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    console.log('✅ PUT /api/addresses/' + req.params.id);
    const { id } = req.params;
    const { fname, lname, email, phone, alternativePhone, address, houseNo, district, state, isDefault } = req.body;

    const existingAddress = await Address.findOne({ _id: id, user: req.user._id });
    if (!existingAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(id, 
      { fname, lname, email, phone, alternativePhone, address, houseNo, district, state, isDefault },
      { new: true }
    );

    console.log('✅ Address updated');
    res.json(updatedAddress);
  } catch (error) {
    console.error('❌ Update address error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    console.log('✅ DELETE /api/addresses/' + req.params.id);
    const { id } = req.params;

    const address = await Address.findOne({ _id: id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await Address.findByIdAndDelete(id);
    await User.findByIdAndUpdate(req.user._id, { $pull: { addresses: id } });

    console.log('✅ Address deleted');
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('❌ Delete address error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };
