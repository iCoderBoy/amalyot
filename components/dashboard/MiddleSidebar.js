import React, { useEffect, useState } from "react";
import { doc, updateDoc, arrayRemove, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";

const MiddleContent = ({ user, userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserImages(userDoc.data().images || []);
        }
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };

    if (userId) {
      fetchUserImages();
    }
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Rasm hajmi juda katta. Iltimos, kichikroq rasm yuklang.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const base64Image = canvas.toDataURL("image/jpeg", 0.7);
        setSelectedFile(base64Image);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Iltimos, avval rasm tanlang.");
      return;
    }

    setUploading(true);
    try {
      const timestamp = new Date().toISOString();
      const newImage = { url: selectedFile, uploadedAt: timestamp };

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        images: arrayUnion(newImage),
      });
      setUserImages((prevImages) => [...prevImages, newImage]);
      alert("Rasm muvaffaqiyatli yuklandi va saqlandi!");
      setSelectedFile(null);
    } catch (error) {
      console.error("Xatolik rasmni saqlashda:", error);
      alert("Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image) => {
    const confirmDelete = window.confirm(
      "Bu rasmni o‘chirishni istaysizmi? Ushbu amal qaytarib bo'lmaydi!"
    );
    if (!confirmDelete) return;

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        images: arrayRemove(image),
      });
      setUserImages((prevImages) =>
        prevImages.filter((img) => img.url !== image.url)
      );
      alert("Rasm muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Xatolik rasmni o'chirishda:", error);
      alert("Rasmni o'chirishda xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button
            onClick={handleUpload}
            className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>

      {/* Greeting Section */}
      <p>Assalomu alaykum, {user?.firstName}!</p>

      {/* Images Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Yuklangan rasmlar:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userImages.map((image, index) => (
            <div
              key={index}
              className="relative border rounded-lg shadow-md p-4 bg-gray-50"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(image)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
              >
                &times;
              </button>
              {/* Image */}
              <img
                src={image.url}
                alt={`Uploaded ${index}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              {/* Timestamp */}
              <p className="text-sm text-gray-500">
                Yuklangan sana: {formatTimestamp(image.uploadedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleContent;
