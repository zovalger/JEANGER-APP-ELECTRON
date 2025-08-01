import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import useUser from "../hooks/useUser";
import { LoginUserDto } from "../dto";

const schema = yup
	.object({
		email: yup.string().email().required("Email es requerido"),
		password: yup
			.string()
			.min(
				8,
				"Contraseña debe tener al menos 8 caracteres con mayusculas, minúsculas, números y símbolos"
			)
			.required("Contraseña es requerida"),
	})
	.required();

const LoginScreen = () => {
	const { login, logout, user, sessionToken, users } = useUser();

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
		await login(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col justify-center items-center h-screen w-screen"
		>
			<Input {...register("email")} placeholder="correo" />
			{errors.email && errors.email.message}
			<Input
				{...register("password")}
				placeholder="contraseña"
				type="password"
			/>
			{errors.password && errors.password.message}

			<Button className="w-full" type="submit">
				Login
			</Button>
			
			<Button className="w-full" type="button" onClick={logout}>
				logout
			</Button>

			{user && user.email}
			{sessionToken && sessionToken.token}

			{/* <Link className="p-4" to={RouterLinks.Bills}>bill</Link> */}
		</form>
	);
};

export default LoginScreen;
