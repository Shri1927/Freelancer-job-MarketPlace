import { CreditCard, Star, Trash2 } from "lucide-react";

export default function PaymentMethodCard({ method, onSetDefault, onRemove }) {
  return (
    <div
      className={`border rounded-xl p-4 shadow-sm bg-white flex justify-between items-center ${
        method.isDefault ? "border-emerald-400" : "border-emerald-100"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
          <CreditCard />
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {method.brand} **** {method.last4}
          </p>
          <p className="text-sm text-gray-500">Expiry {method.expiry}</p>
          {method.isDefault && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <Star size={12} /> Default
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {!method.isDefault && (
          <button
            onClick={() => onSetDefault(method.id)}
            className="text-xs px-3 py-1 rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition"
          >
            Set as default
          </button>
        )}
        <button
          onClick={() => onRemove(method.id)}
          className="p-2 rounded-md text-red-500 hover:bg-red-50 transition"
          title="Remove"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
