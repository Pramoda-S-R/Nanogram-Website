import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { formatReadableTime } from "../../lib/utils";
import { getAllNanograms } from "../../lib/appwrite/api";
import { Link } from "react-router-dom";
import { Check, Github, Instagram, Linkedin, X } from "lucide-react";

function FormDialog() {
  return <div>form</div>;
}

const ControlAboutUs = () => {
  const [nanogram, setNanogram] = useState([]);

  useEffect(() => {
    const fetchAlumini = async () => {
      try {
        const data = await getAllNanograms();
        setNanogram(data);
      } catch (error) {
        console.error("Error fetching alumini members:", error);
      }
    };
    fetchAlumini();
  }, []);

  return (
    <div className="default-container">
      ControlAboutUs
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border px-2 py-1">Index</th>
              <th className="border px-2 py-1">Update</th>
              <th className="border px-2 py-1">Delete</th>
              <th className="border px-2 py-1">Document-Id</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Content</th>
              <th className="border px-2 py-1">Avatar</th>
              <th className="border px-2 py-1">Avatar-Id</th>
              <th className="border px-2 py-1">LinkedIn</th>
              <th className="border px-2 py-1">Instagram</th>
              <th className="border px-2 py-1">Github</th>
              <th className="border px-2 py-1">Alumini</th>
              <th className="border px-2 py-1">Core</th>
              <th className="border px-2 py-1">Priority</th>
              <th className="border px-2 py-1">Created-At</th>
              <th className="border px-2 py-1">Updated-At</th>
            </tr>
          </thead>
          <tbody>
            {nanogram.documents?.map((entry, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">
                  {<FormDialog action={"Update"} news={entry} />}
                </td>
                <td className="border px-2 py-1">
                  <Button
                    variant="destructive"
                    onClick={() => console.log("Delete", entry.$id)}
                    disabled={false}
                  >
                    Delete
                  </Button>
                </td>
                <td className="border px-2 py-1">{entry.$id}</td>
                <td className="border px-2 py-1">{entry.name}</td>
                <td className="border px-2 py-1">{entry.role}</td>
                <td className="border px-2 py-1">{entry.content}</td>
                <td className="border px-2 py-1">
                  <img
                    src={entry.avatarUrl || "/assets/images/placeholder"}
                    alt={entry.name || "avatar"}
                  />
                </td>
                <td className="border px-2 py-1">{entry.avatarId}</td>
                <td className="border px-2 py-1">
                  {entry.linkedin && (
                    <Link to={entry.linkedin} className="flex justify-center">
                      <Linkedin />
                    </Link>
                  )}
                </td>
                <td className="border px-2 py-1">
                  {entry.instagram && (
                    <Link to={entry.instagram} className="flex justify-center">
                      <Instagram />
                    </Link>
                  )}
                </td>
                <td className="border px-2 py-1">
                  {entry.github && (
                    <Link to={entry.github} className="flex justify-center">
                      <Github />
                    </Link>
                  )}
                </td>
                <td className="border px-2 py-1">
                  {entry.alumini ? <Check /> : <X />}
                </td>
                <td className="border px-2 py-1">
                  {entry.core ? <Check /> : <X />}
                </td>
                <td className="border px-2 py-1">{entry.priority}</td>
                <td className="border px-2 py-1">
                  {formatReadableTime(entry.$createdAt)}
                </td>
                <td className="border px-2 py-1">
                  {formatReadableTime(entry.$updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlAboutUs;
