import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { Plus, Trash2, X } from 'lucide-react';
import axios from 'axios';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState({ rto: 0, insurance: 0 });

  const [formData, setFormData] = useState({
    modelName: '',
    variant: '',
    exPrice: '',
    rtoCharges: '',
    insuranceCharges: '',
    accessoriesCharges: '',
    engine: '',
    mileage: '',
    transmission: '',
    fuelType: '',
    carImg: '',
    onRoadPrice: ''
  });

  const API_URL = "http://localhost:5000/api/newcars";
  const SETTINGS_URL = "http://localhost:5000/api/settings";

  // 🔹 Fetch cars
  const fetchCars = async () => {
    try {
      const res = await axios.get(API_URL);
      setCars(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch settings
  const fetchSettings = async () => {
    try {
      const res = await axios.get(SETTINGS_URL);
      const s = res.data.data || { rto: 0, insurance: 0 };
      setSettings(s);

      setFormData(prev => ({
        ...prev,
        rtoCharges: s.rto,
        insuranceCharges: s.insurance,
        onRoadPrice: calculateOnRoadPrice(prev.exPrice, s.rto, s.insurance, prev.accessoriesCharges)
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchSettings();
  }, []);

  // 🔹 Calculate On-Road Price
  const calculateOnRoadPrice = (exPrice, rto, insurance, accessories) => {
    const ex = parseFloat(exPrice) || 0;
    const r = parseFloat(rto) || 0;
    const ins = parseFloat(insurance) || 0;
    const acc = parseFloat(accessories) || 0;
    const total = ex + (ex * r / 100) + (ex * ins / 100) + acc;
    return ex > 0 ? `₹ ${total.toFixed(2)} Lakh` : '';
  };

  // 🔹 Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updated = { ...formData, [id]: value };

    updated.onRoadPrice = calculateOnRoadPrice(
      updated.exPrice,
      settings.rto,
      settings.insurance,
      updated.accessoriesCharges
    );

    setFormData(updated);
  };

  // 🔹 Add new car (MATCHED WITH YOUR BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend Schema મુજબ ડેટા ગોઠવ્યો
      const payload = {
        modelName: formData.modelName,
        variant: formData.variant,
        exPrice: parseFloat(formData.exPrice),
        rtoCharges: settings.rto,
        insuranceCharges: settings.insurance,
        accessoriesCharges: parseFloat(formData.accessoriesCharges) || 0,
        carImg: formData.carImg, 
        specifications: {
          engine: formData.engine,
          mileage: formData.mileage,
          transmission: formData.transmission,
          fuelType: formData.fuelType,
        }
      };

      const res = await axios.post(API_URL, payload);
      setCars(prev => [res.data.data, ...prev]);

      // reset form
      setFormData({
        modelName: '', variant: '', exPrice: '',
        rtoCharges: settings.rto, insuranceCharges: settings.insurance,
        accessoriesCharges: '', engine: '', mileage: '',
        transmission: '', fuelType: '', carImg: '', onRoadPrice: ''
      });

      setIsModalOpen(false);
      alert("Car saved successfully!");
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      alert("Failed to save car. Check console for details.");
    }
  };

  // 🔹 Delete car
  const deleteCar = async (id) => {
    if (!window.confirm('Delete car?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCars(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Inventory Management" />
        <div className="p-10 overflow-y-auto flex-1">

          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1e293b]">Car Fleet</h2>
              <p className="text-sm text-gray-500 mt-1">Manage inventory and pricing.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <Plus size={20} /> Add New Car
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.length === 0 ? (
              <div className="col-span-full py-24 text-center text-gray-400 bg-white border-2 border-dashed border-gray-100 rounded-[2rem]">
                No cars available.
              </div>
            ) : (
              cars.map(car => (
                <div key={car._id} className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="h-44 overflow-hidden bg-[#f1f5f9]">
                    <img src={car.carImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={car.modelName} />
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold text-[#1e293b] text-lg mb-1">{car.modelName}</h4>
                    <p className="text-xs text-gray-400 mb-4">Variant: {car.variant}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-xl">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Ex-Showroom</span>
                        <span className="text-sm font-bold text-gray-700">₹{car.exPrice} L</span>
                      </div>

                      <div className="flex justify-between items-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">On-Road</span>
                        <span className="text-sm font-bold text-blue-600">
                           {/* Display calculated on-road price */}
                           {calculateOnRoadPrice(car.exPrice, car.rtoCharges, car.insuranceCharges, car.accessoriesCharges).replace('₹ ', '')}
                        </span>
                      </div>
                    </div>

                    <button onClick={() => deleteCar(car._id)} className="w-full py-3 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-transparent hover:border-red-100">
                      <Trash2 size={14} /> Remove Model
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-300 hover:text-gray-500">
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-8 text-[#1e293b]">Add New Vehicle</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" id="modelName" placeholder="Model Name" value={formData.modelName} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />
              <input type="text" id="variant" placeholder="Variant" value={formData.variant} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />
              <input type="number" id="exPrice" placeholder="Ex-Showroom Price" value={formData.exPrice} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-700 font-bold flex justify-between items-center">
                  <span>RTO Rate</span> <span>{settings.rto}%</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-700 font-bold flex justify-between items-center">
                  <span>Insurance Rate</span> <span>{settings.insurance}%</span>
                </div>
              </div>

              <input type="number" id="accessoriesCharges" placeholder="Accessories Charges" value={formData.accessoriesCharges} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />
              <div className="w-full bg-blue-100 border border-blue-200 p-4 rounded-xl font-extrabold text-blue-800 mt-2">
                On-Road Price: {formData.onRoadPrice || '₹ 0.00 Lakh'}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <input type="text" id="engine" placeholder="Engine" value={formData.engine} onChange={handleInputChange} className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />
                <input type="text" id="mileage" placeholder="Mileage" value={formData.mileage} onChange={handleInputChange} className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />
                <input type="text" id="transmission" placeholder="Transmission" value={formData.transmission} onChange={handleInputChange} className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />
                <input type="text" id="fuelType" placeholder="Fuel Type" value={formData.fuelType} onChange={handleInputChange} className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />
              </div>

              <input type="url" id="carImg" placeholder="Image URL" value={formData.carImg} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-blue-600 font-medium" />

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg">Save to Inventory</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;