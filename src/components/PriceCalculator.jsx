import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PriceCalculator = ({ files }) => {
  const [settings, setSettings] = useState({
    pageSize: 'A4',
    isColor: true,
    doubleSided: false,
    copies: 1,
    paperType: 'standard'
  });

  const prices = {
    A4: {
      standard: { color: 15.00, bw: 3.00 },
      glossy: { color: 25.00, bw: 8.00 }
    },
    A3: {
      standard: { color: 30.00, bw: 6.00 },
      glossy: { color: 45.00, bw: 15.00 }
    },
    Legal: {
      standard: { color: 20.00, bw: 4.00 },
      glossy: { color: 30.00, bw: 10.00 }
    }
  };

  const calculatePrice = () => {
    const basePrice = prices[settings.pageSize][settings.paperType][settings.isColor ? 'color' : 'bw'];
    const discount = settings.doubleSided ? 0.85 : 1; // 15% discount for double-sided
    const totalPages = files.length * settings.copies;
    return (basePrice * totalPages * discount).toFixed(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Compute Price</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Size
            </label>
            <select
              value={settings.pageSize}
              onChange={(e) => setSettings({ ...settings, pageSize: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="A4">A4</option>
              <option value="A3">A3</option>
              <option value="Legal">Legal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paper Type
            </label>
            <select
              value={settings.paperType}
              onChange={(e) => setSettings({ ...settings, paperType: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="standard">Standard</option>
              <option value="glossy">Photo Paper (Glossy)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Printing
            </label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={settings.isColor}
                onChange={(e) => setSettings({ ...settings, isColor: e.target.checked })}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Double Sided
            </label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={settings.doubleSided}
                onChange={(e) => setSettings({ ...settings, doubleSided: e.target.checked })}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Copies
          </label>
          <input
            type="number"
            min="1"
            value={settings.copies}
            onChange={(e) => setSettings({ ...settings, copies: parseInt(e.target.value) || 1 })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <motion.div
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Total Price:</span>
            <span className="text-3xl font-bold text-blue-600">
              ₱{calculatePrice()}
            </span>
          </div>
          {settings.doubleSided && (
            <p className="text-sm text-gray-500 mt-2">
              *15% discount applied for double-sided printing
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PriceCalculator;