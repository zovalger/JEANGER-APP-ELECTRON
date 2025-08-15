import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import useUser from "../hooks/useUser";
import { LoginUserDto } from "../dto";
import RouterLinks from "../../common/config/RouterLinks";

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
	})
	.required();

const LoginScreen = () => {
	const router = useNavigate();
	const { login } = useUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginUserDto>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: LoginUserDto) => {
		try {
			await login(data);
			router(RouterLinks.Bills);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen w-screen p-4">
			<form className="shadow-md p-4 rounded" onSubmit={handleSubmit(onSubmit)}>
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

				<Button className="w-full mt-2" type="submit">
					Login
				</Button>
			</form>
		</div>
	);
};

export default LoginScreen;
