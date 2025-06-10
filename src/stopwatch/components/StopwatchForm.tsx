"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useStopwatchContext } from "@/app/dashboard/stopwatch/context/Stopwatch.context";

interface props {
	// productDataForm: Product;
	open: boolean;
	setOpen(value: boolean): void;
}

export default function StopwatchForm({ open, setOpen }: props) {
	const {
		sendCreateStopwatch,
		sendUpdateStopwatch,
		sendDeleteStopwatch,
		stopwatchData,
		setStopwatchData,
	} = useStopwatchContext();

	// *******************************************************************
	// 													productos
	// *******************************************************************

	const [onSubmited, setOnSubmited] = useState(false);

	const formik = useFormik({
		initialValues: stopwatchData || {
			_id: "",
			name: "",
			timeDate: null,
			accumulatedTime: 0,
			timeSeted: 0,
		},
		validationSchema: Yup.object({
			_id: Yup.string().default(""),
			name: Yup.string().required().min(3, "Minimo 3 letras").default(""),
		}),
		onSubmit: async (formData) => {
			try {
				setOnSubmited(true);

				if (formData._id) await sendUpdateStopwatch(formData);
				else await sendCreateStopwatch(formData);

				handleClose();
			} catch (error) {
				console.log(error);
			}
			setOnSubmited(false);
		},
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setStopwatchData(null);
		setOpen(false);
	};

	const onDelete = async () => {
		try {
			if (!formik.values._id) return;

			setOnSubmited(true);

			sendDeleteStopwatch(formik.values._id);

			handleClose();
		} catch (error) {
			console.log(error);
		}

		setOnSubmited(false);
	};

	// *******************************************************************
	// 													peticiones
	// *******************************************************************

	// *******************************************************************
	// 													render
	// *******************************************************************

	return (
		<div>
			{/* <Button onClick={handleOpen}>{productDataForm.name}</Button> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box
					sx={{
						position: "absolute" as "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "60vw",
						maxHeight: "80vh",
						overflowY: "auto",
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						pt: 2,
						px: 4,
						pb: 3,
					}}
				>
					<Box
						sx={{ display: "flex" }}
						component={"form"}
						onSubmit={(e) => {
							e.preventDefault();
							formik.submitForm();
						}}
					>
						<TextField
							// label="Nombre del producto"
							placeholder="Nombre del Cronometro"
							variant="outlined"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							sx={{ flexGrow: 1 }}
							autoComplete="none"

							// fullWidth
						/>
					</Box>

					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
						{formik.values._id && (
							<Button color="error" onClick={onDelete} sx={{ mr: "1rem" }}>
								Eliminar
							</Button>
						)}

						<Button variant="contained" onClick={() => formik.submitForm()}>
							Guardar
						</Button>
					</Box>
				</Box>
			</Modal>

			{/* Barra de carga */}
		</div>
	);
}
