import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUser, IUpdateUser } from "../../Interfaces/Auth";
import Input from "../../Components/Input/Input1";
import { useUpdateUser } from "../../Hooks/UserHook";
import {
  Check,
  CircleUser,
  Mail,
  MapPinHouse,
  Phone,
  StickyNote,
} from "lucide-react";
import Button from "../../Components/Button/Button";
import { useDeleteUser } from "../../Hooks/UserHook";
import InfinityLoader from "../../Helpers/Loader";
import Modal from "../../Components/Modal/Modal";
import SidebarAuth from "../Sidebar/AuthSid";

const Profile = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateUser, updatedUser, loading, error } = useUpdateUser();
  const { fetchUserById, user, logout } = useAuth();
  const [userById, setUserById] = useState<IUser | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<IUpdateUser>>({});
  const [updated, setUpdated] = useState(false);
  const [desable, setDisable] = useState(false);
  const personId = user?.sid;
  const navigate = useNavigate();
  const { deleteUser } = useDeleteUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isdeleteUser, setIsdeleteUser] = useState(false);

  const handleSubmit = async () => {
    if (!personId || Object.keys(updatedData).length === 0) return;
    setIsUpdating(true);
    await updateUser(personId, updatedData);
    setIsUpdating(false);
    setUpdated(true);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setIsdeleteUser(false);
      setDisable(true);
      setIsDeleteModalOpen(true);
      logout();
      console.log("Usuario eliminado correctamente", desable);
    } catch (error) {
      setIsdeleteUser(true);
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    if (updatedUser && Object.keys(updatedUser).length > 0) {
      setIsUpdateModalOpen(true);
      setUserById(updatedUser);
      setUpdatedData(updatedUser);
      setUpdated(false);
    }
  }, [updatedUser]);

  //  Captura los cambios y almacena en updatedData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUpdatedData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // También actualiza userById para que los inputs reflejen los cambios en tiempo real
    setUserById((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  useEffect(() => {
    if (!personId || updated) return;
    const getUser = async () => {
      const fetchedUser = await fetchUserById(personId);
      if (fetchedUser) {
        setUserById(fetchedUser);
        setUpdatedData(fetchedUser); // Inicializa `updatedData` con datos actuales
      }
    };
    getUser();
  }, [personId, updated]);

  if (loading && !isUpdating) return <InfinityLoader />;

  return (
    <div className="w-full mt-4 m-auto ">
      {userById ? (
        <div className="flex gap-5 mx-5">
          <SidebarAuth />
          <div className="text-text-900 bg-background-0 dark:bg-background-100 p-5 rounded-xl  shadow-2xl  w-full">
            <p className="text-left text-text-700 text-4xl font-[800]">
              Perfil
            </p>
            <div className="flex gap-5 my-5 ">
              <div className="w-full">
                <p className="text-sm mb-2 font-semibold ml-2">Primer Nombre</p>
                <Input
                  id="firstname"
                  htmlFor="firstname"
                  label="First Name"
                  type="text"
                  icon={CircleUser}
                  value={userById?.firstname ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <p className="text-sm mb-2 font-semibold ml-2">
                  Segundo Nombre
                </p>
                <Input
                  id="middlename"
                  htmlFor="middlename"
                  label="Middle Name"
                  type="text"
                  icon={CircleUser}
                  value={updatedData.middlename ?? userById.middlename ?? ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-full">
                <p className="text-sm mb-2 font-semibold ml-2">Apellido</p>
                <Input
                  id="lastname"
                  htmlFor="lastname"
                  label="Last Name"
                  type="text"
                  icon={CircleUser}
                  value={updatedData.lastname ?? userById.lastname ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <p className="text-sm mb-2 font-semibold ml-2">
                  Numero de Documento
                </p>
                <Input
                  id="documentNumber"
                  htmlFor="documentNumber"
                  label="Document Number"
                  type="text"
                  icon={StickyNote}
                  value={
                    updatedData.documentnumber ?? userById.documentnumber ?? ""
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-5 my-5">
              <div className="w-full">
                <p className="text-sm mb-2 font-semibold ml-2">
                  Numero de Telefono
                </p>
                <Input
                  id="phonenumber"
                  htmlFor="phonenumber"
                  label="Phone Number"
                  type="number"
                  icon={Phone}
                  value={updatedData.phonenumber ?? userById.phonenumber ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <p className="text-sm mb-2 font-semibold ml-2">Email</p>
                <Input
                  id="Email"
                  htmlFor="Email"
                  label="Email"
                  type="text"
                  icon={Mail}
                  value={updatedData.email ?? userById.email ?? ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p className="text-sm mb-2 font-semibold ml-2">Direccion</p>
            <Input
              id="address"
              htmlFor="address"
              label="Address"
              type="text"
              icon={MapPinHouse}
              value={updatedData.address ?? userById.address ?? ""}
              onChange={handleChange}
            />

            <div className="flex gap-10 my-5">
              <div className="w-[35%]">
                <Button
                  text="Deshabilitar Cuenta"
                  onClick={() => handleDelete(personId ?? "")}
                  disabled={isdeleteUser}
                  variant="deleteUser"
                  type="button"
                />
                <Modal
                  isOpen={isDeleteModalOpen}
                  onClose={() => {
                    setIsDeleteModalOpen(false);
                    navigate("/home");
                  }}
                  autoClose={true} 
                >
                  <div className="flex flex-col items-center text-center space-y-4 p-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                      <Check className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      ¡Usuario Deshabilitado con éxito!
                    </h2>
                    <p className="text-gray-500">
                      Vuelve a registrarte con un nuevo usuario o sigue
                      explorando.
                    </p>
                  </div>
                </Modal>
              </div>
              <div className="w-[70%]">
                <Button
                  text="Actualizar"
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  variant="sesion"
                  type="submit"
                />
              </div>
              <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                  setIsUpdateModalOpen(false);
                  navigate("/home");
                }}
                autoClose={true}
              >
                <div className="flex flex-col items-center text-center space-y-4 p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    ¡Usuario actualizado con éxito!
                  </h2>
                  <p className="text-gray-500">
                    Sigue explorando nuestros productos, sé que te gustarán{" "}
                    {userById.firstname}.
                  </p>
                </div>
              </Modal>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <InfinityLoader />
      )}
    </div>
  );
};

export default Profile;
