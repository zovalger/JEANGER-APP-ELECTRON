import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import useUser from "../hooks/useUser";
import { LoginUserDto } from "../dto";
import { Link, useNavigate } from "react-router-dom";
import RouterLinks from "../../common/config/RouterLinks";
import useRequest from "../../common/hooks/useRequest";
import { useEffect } from "react";

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
	const router = useNavigate();
	const { login, logout } = useUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginUserDto>({
		defaultValues: {
			email: "test1@gmail.com",
			password: "Vv12345678.",
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
		</form>
	);
};

export default LoginScreen;
