import React from "react";

const UpvoteListModal = ({ showModal, closeModal, selectedBook }) => {
  if (!showModal || !selectedBook) return null; // Don't render modal if not visible

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-4">
          Upvoters for "{selectedBook.title}"
        </h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {selectedBook.upvotes?.map((upvote, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={upvote.photo}
                      alt={upvote.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{upvote.name}</td>
                  <td>{upvote.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-action">
          <button onClick={closeModal} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpvoteListModal;
