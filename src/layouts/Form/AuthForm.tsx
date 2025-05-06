import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../Hooks/UserHook";
import DocumentDropdown from "../../Components/Dropdown/DocumentsDropdown";
import Input from "../../Components/Input/Input1";
import Input2 from "../../Components/Input/Input2";
import Button from "../../Components/Button/Button";
import { Mail, Lock, User, FileText, Phone } from "lucide-react";
import { useState } from "react";
import PasswordReset from "../Card/user/PassReset";
import { IAuthLogin, IAuthRegister } from "../../Interfaces/Auth";
import { useToast } from "../../Contexts/ToastContext";

interface RegisterProps {
  type: "register";
  onSubmit: (data: IAuthRegister) => void;
}

interface LoginProps {
  type: "login";
  onSubmit: (data: IAuthLogin) => void;
}

type AuthFormProps = RegisterProps | LoginProps;

const AuthForm = ({ type }: AuthFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { login, register, setError } = useAuth();
  const { showToast } = useToast();
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleSelectDocument = (documentID: any) => {
    setSelectedDocument(documentID.id);
  };

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    firstName:
      type === "register"
        ? Yup.string().required("El nombre es obligatorio")
        : Yup.string(),
    lastName:
      type === "register"
        ? Yup.string().required("El apellido es obligatorio")
        : Yup.string(),
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword:
      type === "register"
        ? Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            .required("Confirma tu contraseña")
        : Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      documentID: "",
      documentNumber: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let response;
        console.log("response: ", response);

        if (type === "register") {
          if (!selectedDocument) {
            setError("Selecciona un documento válido.");
            showToast("error", "Selecciona un documento valido.");
            return;
          }

          // Realizar la llamada a la API para registrar
          response = await register({
            firstname: values.firstName,
            lastname: values.lastName,
            documentid: selectedDocument,
            documentnumber: values.documentNumber,
            phonenumber: values.phoneNumber,
            email: values.email,
            pass: values.password,
          });
          navigate("/login");
          showToast("success", "Registro exitoso");
        } else if (type === "login") {
          // El proceso de login
          response = await login({
            email: values.email,
            pass: values.password,
          });
        }

        // Verifica si se ha obtenido el token de la respuesta
        if (!localStorage.getItem("token")) {
          setError("Credenciales incorrectas.");
          return; // No redirigir si no hay token
        }

        navigate("/home");

        window.location.reload();
        showToast("success", "Bienvenido a 8Cores");
      } catch (err) {
        console.error("Error:", err); // Log the actual error
        setError("Hubo un error al procesar la solicitud.");
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg space-y-2 md:space-y-4 mx-auto bg-background-0 dark:bg-background-200"
      >
        {/* Sección de registro */}
        {type === "register" && (
          <div className="grid">
            <div className="flex gap-1 mb-3">
              <Input2
                id="firstName"
                htmlFor="firstName"
                label="Nombre"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={User}
                error={formik.touched.firstName ? formik.errors.firstName : ""}
              />
              <Input2
                id="lastName"
                htmlFor="lastName"
                label="Apellido"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={User}
                error={formik.touched.lastName ? formik.errors.lastName : ""}
              />
            </div>

            <div className="flex gap-1 ">
              <DocumentDropdown onSelect={handleSelectDocument} />

              <Input2
                id="documentNumber"
                htmlFor="documentNumber"
                label="Documento"
                type="text"
                value={formik.values.documentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={FileText}
                error={
                  formik.touched.documentNumber
                    ? formik.errors.documentNumber
                    : ""
                }
              />
            </div>

            <div className="flex mt-3">
              <Input
                id="phoneNumber"
                htmlFor="phoneNumber"
                label="Teléfono"
                type="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={Phone}
                error={
                  formik.touched.phoneNumber ? formik.errors.phoneNumber : ""
                }
              />
            </div>
          </div>
        )}

        {/* Sección de login */}
        <div className="space-y-4">
          {type === "login" ? (
            <>
              <Input
                id="email"
                htmlFor="email"
                label="Correo"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={Mail}
                error={formik.touched.email ? formik.errors.email : ""}
              />

              <Input
                id="password"
                htmlFor="password"
                label="Contraseña"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={Lock}
                error={formik.touched.password ? formik.errors.password : ""}
              />
            </>
          ) : (
            <>
              <Input
                id="email"
                htmlFor="email"
                label="Correo"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={Mail}
                error={formik.touched.email ? formik.errors.email : ""}
              />
              <div className="flex gap-1">
                <Input2
                  id="password"
                  htmlFor="password"
                  label="Contraseña"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={Lock}
                  error={formik.touched.password ? formik.errors.password : ""}
                />

                <Input2
                  id="confirmPassword"
                  htmlFor="confirmPassword"
                  label="Confirmar"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={Lock}
                  error={
                    formik.touched.confirmPassword
                      ? formik.errors.confirmPassword
                      : ""
                  }
                />
              </div>
            </>
          )}
        </div>

        {/* Botón de envío */}
        <Button
          text={
            formik.isSubmitting
              ? "Cargando..."
              : type === "login"
              ? "Iniciar Sesión"
              : "Registrarse"
          }
          isLoading={formik.isSubmitting}
          variant="sesion"
          type="submit"
        />

        {/* Enlaces de navegación según el tipo de formulario */}
        {type === "login" ? (
          <div className="text-sm text-center space-y-2">
            <p
              className="text-accent-500 hover:underline cursor-pointer"
              onClick={handleOpenModal}
            >
              ¿Has olvidado tu contraseña?
            </p>

            <p className="text-text-900">
              ¿No tienes cuenta?{" "}
              <a href="/signup" className="text-accent-500 hover:underline">
                Regístrate aquí
              </a>
            </p>
          </div>
        ) : (
          <p className="text-sm text-center">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-accent-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        )}
      </form>
      <PasswordReset
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AuthForm;
