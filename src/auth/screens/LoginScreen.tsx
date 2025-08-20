import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import useUser from "../hooks/useUser";
import { LoginUserDto } from "../dto";
import RouterLinks from "../../common/config/RouterLinks";
import SessionItem from "../components/SessionItem";
import Text from "../../common/components/Text";
import toast from "react-hot-toast";

const schema = yup
	.object({
		email: yup.string().email().required("El correo es requerido"),
		password: yup
			.string()
			.min(
				8,
				"La contraseña debe tener al menos 8 caracteres con mayusculas, minúsculas, números y símbolos"
			)
			.required("Contraseña es requerida"),
		save: yup
			.boolean()

			.required("Contraseña es requerida"),
	})
	.required();

interface p extends LoginUserDto {
	save: boolean;
}

const LoginScreen = () => {
	const router = useNavigate();
	const { login, savedSessions } = useUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<p>({
		defaultValues: {
			email: "",
			password: "",
			save: false,
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: p) => {
		const { save, ...rest } = data;
		try {
			await login(rest, save);

			router(RouterLinks.Bills);
		} catch (error) {
			console.log(error);

			toast.error(error.message || "Error desconocido");
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen w-screen p-4">
			<div className="shadow-md p-4 rounded">
				{savedSessions.length > 0 && (
					<>
						<div>
							<Text>Sesiones anteriores</Text>

							{savedSessions.map((item) => (
								<SessionItem key={item._id} data={item} />
							))}
						</div>

						<hr className="my-2" />
					</>
				)}

				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<Input
						{...register("email")}
						label="Correo"
						placeholder="correo"
						errorText={errors.email && errors.email.message}
					/>

					<Input
						{...register("password")}
						label="Contraseña"
						type="password"
						errorText={errors.password && errors.password.message}
					/>

					<Input {...register("save")} label="Guardar Sesión" type="checkbox" />

					<Button className="w-full mt-2" type="submit">
						Login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginScreen;
