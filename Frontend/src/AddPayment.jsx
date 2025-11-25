import { useState } from "react";

const AddPayment = () => {
  const [amount, setAmount] = useState(0);
  const [splitType, setSplitType] = useState("");

  return (
    <div className="flex flex-col h-full w-full items-center gap-12">
      <p className="text-white text-4xl">Add Payment</p>

      <form className="flex flex-col w-[90%]">
        <label className="flex gap-2 items-center">
        Enter Amount:
        <input
          className="border-2 border-white h-10 w-100 rounded-2xl p-4"
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        </label>
        <p className="text-white mt-4">Split type:</p>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="splitType"
            value="Equal"
            checked={splitType === "Equal"}
            onChange={(e) => setSplitType(e.target.value)}
            className="hidden"
          />

          <span
            className={`h-4 w-4 rounded-full border-2 border-white flex items-center justify-center`}
          >
            {splitType === "Equal" && (
              <span className="h-2 w-2 rounded-full bg-indigo-700"></span>
            )}
          </span>

          <span className="text-white">Equal</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="splitType"
            value="Unequal"
            checked={splitType === "Unequal"}
            onChange={(e) => setSplitType(e.target.value)}
            className="hidden"
          />

          <span
            className={`h-4 w-4 rounded-full border-2 border-white flex items-center justify-center`}
          >
            {splitType === "Unequal" && (
              <span className="h-2 w-2 rounded-full bg-indigo-700"></span>
            )}
          </span>

          <span className="text-white">Unequal</span>
        </label>

        {splitType==="Equal"&&{}}
      </form>
    </div>
  );
};

export default AddPayment;
