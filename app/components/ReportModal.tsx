import { useState } from 'react';
import { toast } from 'react-toastify';


type ReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
};

export default function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState(''); // To track selected reason
  const [customReason, setCustomReason] = useState(''); // For the custom reason when "Other" is selected

  const handleSubmit = () => {
    const reason = selectedReason === 'Other' ? customReason : selectedReason;
    onSubmit(reason); // Pass the selected or custom reason to the parent component
    toast.success('Your report has been submitted successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Report Ad</h2>
        <p className="text-gray-700 mb-2">Please select a reason for reporting this ad:</p>

        <div className="flex flex-col space-y-2 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="reason"
              value="Spam"
              checked={selectedReason === 'Spam'}
              onChange={() => setSelectedReason('Spam')}
            />
            <span>Spam</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="reason"
              value="Misleading"
              checked={selectedReason === 'Misleading'}
              onChange={() => setSelectedReason('Misleading')}
            />
            <span>Misleading Information</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="reason"
              value="Inappropriate"
              checked={selectedReason === 'Inappropriate'}
              onChange={() => setSelectedReason('Inappropriate')}
            />
            <span>Inappropriate Content</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="reason"
              value="Other"
              checked={selectedReason === 'Other'}
              onChange={() => setSelectedReason('Other')}
            />
            <span>Other</span>
          </label>

          {selectedReason === 'Other' && (
            <input
              type="text"
              className="mt-2 border rounded-md p-2"
              placeholder="Please specify..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
            disabled={!selectedReason || (selectedReason === 'Other' && !customReason)} // Disable button if no reason or custom reason is empty
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
