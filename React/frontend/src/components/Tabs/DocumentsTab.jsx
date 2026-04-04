import { useState } from "react";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import UploadDocumentModal from "../UploadDocumentModal";
import { toast } from "react-hot-toast";
import {
  AiFillFilePdf,
  AiFillFileImage,
  AiFillFileWord,
  AiFillFileExcel,
  AiFillFile
} from "react-icons/ai";
import useDocuments from "../../hooks/useDocuments";
import useAuth from  "../../hooks/useAuth";
const DocumentsTab = ({ customerId }) => {
  const {
    documents,
    loading,
    handleUpload,
    handleDelete,
    refresh,
  } = useDocuments(customerId);

  const [showUpload, setShowUpload] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  // -----------------------------
  // DELETE LOGIC (UI ONLY)
  // -----------------------------
  const requestDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting document...");
    try {
      await handleDelete(deleteId);
      toast.success("Document deleted successfully!", { id: toastId });
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete document.", { id: toastId });
    }
  };

  // -----------------------------
  // FILE ICONS
  // -----------------------------
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();

    switch (ext) {
      case "pdf":
        return <AiFillFilePdf size={22} color="#d9534f" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <AiFillFileImage size={22} color="#0275d8" />;
      case "doc":
      case "docx":
        return <AiFillFileWord size={22} color="#1e90ff" />;
      case "xls":
      case "xlsx":
        return <AiFillFileExcel size={22} color="#5cb85c" />;
      default:
        return <AiFillFile size={22} color="#555" />;
    }
  };

  // -----------------------------
  // PREVIEW MODAL
  // -----------------------------
  const [previewDoc, setPreviewDoc] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openPreview = (doc, index) => {
    setPreviewDoc(doc);
    setCurrentIndex(index);
    setShowPreview(true);
  };

  const closePreview = () => {
    setPreviewDoc(null);
    setShowPreview(false);
  };

  const showNext = () => {
    if (currentIndex < documents.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setPreviewDoc(documents[nextIndex]);
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setPreviewDoc(documents[prevIndex]);
    }
  };

  // -----------------------------
  // HELPERS
  // -----------------------------
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const getFileTypeLabel = (ext) => {
    const type = ext.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "heic"].includes(type)) return "Image";
    if (["pdf"].includes(type)) return "PDF";
    if (["doc", "docx"].includes(type)) return "Word";
    if (["xls", "xlsx"].includes(type)) return "Excel";
    return "File";
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Customer Documents</h5>
        <Button onClick={() => setShowUpload(true)}>Upload Document</Button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No documents uploaded yet
                </td>
              </tr>
            ) : (
              documents.map((doc, index) => (
                <tr key={doc.id}>
                  <td className="d-flex align-items-center gap-2">
                    {getFileIcon(doc.file_name)}
                    {doc.file_name}

                    <span className="badge bg-light text-dark border">
                      {getFileTypeLabel(doc.file_type)}
                    </span>
                  </td>

                  <td>{formatFileSize(doc.file_size)}</td>

                  <td>{new Date(doc.uploaded_at).toLocaleDateString()}</td>

                  <td>
                    <Button
                      variant="link"
                      className="p-0 me-3"
                      onClick={() => openPreview(doc, index)}
                    >
                      View
                    </Button>


                       {isAdmin && (
                    <>
                      <span className="mx-2 text-muted">|</span>
                      <Button
                      variant="danger"
                      size="sm"
                      onClick={() => requestDelete(doc.id)}
                    >
                      Delete
                    </Button>
                    </>
                  )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Upload Modal */}
      <UploadDocumentModal
        show={showUpload}
        onHide={() => setShowUpload(false)}
        customerId={customerId}
        onUploaded={refresh}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <div className="modal-backdrop fade show"></div>}

      <div className={`modal fade ${showDeleteConfirm ? "show d-block" : ""}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteConfirm(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this document?</p>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={closePreview} size="lg" centered>
        <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
          <Modal.Title>Preview Document</Modal.Title>

          <div className="d-flex align-items-center gap-2">
            <Button variant="light" disabled={currentIndex === 0} onClick={showPrev}>
              ← Prev
            </Button>

            <Button
              variant="light"
              disabled={currentIndex === documents.length - 1}
              onClick={showNext}
            >
              Next →
            </Button>
          </div>
        </Modal.Header>

        <Modal.Body style={{ minHeight: "400px" }}>
          {previewDoc && (() => {
            const ext = previewDoc.file_type?.toLowerCase();

            if (["jpg", "jpeg", "png", "gif", "heic"].includes(ext)) {
              return (
                <img
                  src={previewDoc.file_url}
                  alt={previewDoc.file_name}
                  className="img-fluid rounded"
                />
              );
            }

            if (ext === "pdf") {
              return (
                <iframe
                  src={previewDoc.file_url}
                  title="PDF Preview"
                  style={{ width: "100%", height: "70vh", border: "none" }}
                />
              );
            }

            return (
              <div className="text-center py-4">
                <p>No preview available for this file type.</p>
                <Button
                  variant="primary"
                  href={previewDoc.file_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download File
                </Button>
              </div>
            );
          })()}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closePreview}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DocumentsTab;
