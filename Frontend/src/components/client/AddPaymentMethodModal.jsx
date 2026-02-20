import { useState } from "react";
import { X } from "lucide-react";
import { apiFetch } from "@/lib/apiClient";

export default function AddPaymentMethodModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () =>
    setForm({ name: "", number: "", expiry: "", cvv: "", address: "" });

  const handleSave = async () => {
    if (
      !form.name ||
      form.number.length < 12 ||
      !form.expiry ||
      form.cvv.length < 3
    ) {
      alert("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch("/client/payment-methods", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          card_number: form.number,
          expiry: form.expiry,
          cvv: form.cvv,
          address: form.address,
        }),
      });

      // Expect backend to return the created payment method object
      if (typeof onAdd === "function") {
        onAdd(data.paymentMethod || data);
      }

      resetForm();
      onClose();
      alert("Payment method added successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add payment method");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold text-emerald-700 mb-4">
          Add Payment Method
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Cardholder Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <input
            name="number"
            placeholder="Card Number"
            value={form.number}
            onChange={handleChange}
            className="w-full border border-emerald-100 rounded-lg px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              className="border border-emerald-100 rounded-lg px-3 py-2"
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={handleChange}
              className="border border-emerald-100 rounded-lg px-3 py-2"
            />
          </div>
          <input
            name="address"
            placeholder="Billing Address (optional)"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-emerald-100 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Card"}
          </button>
        </div>
      </div>
    </div>
  );
}
