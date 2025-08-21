import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../../auth/hooks/useUser";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import moneyFormat from "../../common/helpers/moneyFormat.helper";
import useBill from "../hooks/useBill";
import { IBill } from "../interfaces";
import Input from "../../common/components/Input";
import Popover from "../../common/components/Popover";
import Button from "../../common/components/Button";

const schema = yup
	.object({
		name: yup.string().min(3).required("Nombre es requerido"),
	})
	.required();

interface props {
	data: IBill;
}

export default function SavedBillsItem({ data }: props) {
	const { name, totals, tempId, createdBy } = data;

	const { userLogged, user } = useUser({ userId: createdBy });

	const { currentBill, selectBill, removeBill, renameBill } = useBill();

	const [modeRename, setModeRename] = useState(false);

	const [popoverOpen, setPopoverOpen] = useState(false);

	// todo: crear el form para renombrar

	const [isSubmit, setIsSubmit] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: "",
		},
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (formData: { name: string }) => {
		if (isSubmit) return;
		setIsSubmit(true);

		try {
			await renameBill({
				...formData,
				_id: tempId,
				updatedAt: new Date().toISOString(),
			});

			setModeRename(false);
		} catch (error) {
			// toast.error(error.message || "Error al guardar el producto");
		}

		setIsSubmit(false);
	};

	const handdleSelect = async () => {
		if (modeRename) return;
		await selectBill(tempId);
	};

	const handdleDelete = async () =>
		await removeBill({
			_id: tempId,
			updatedAt: new Date().toISOString(),
		});

	const handleContenxtMenu = async () => {
		setModeRename(true);
	};

	useEffect(() => {
		reset({ name: data.name });
	}, [data, reset]);

	useEffect(() => {
		if (
			currentBill &&
			currentBill.tempId != tempId &&
			!data.name &&
			data.createdBy == userLogged?._id
		)
			setModeRename(true);
	}, [currentBill]);

	return (
		<div
			onClick={handdleSelect}
			onContextMenuCapture={(e) => {
				e.preventDefault();
				handleContenxtMenu();
			}}
			style={{
				backgroundColor:
					currentBill && currentBill.tempId == tempId
						? userLogged?.identityColor + "55"
						: "",
				borderColor: user?.identityColor,
			}}
			className={`relative flex gap-2 py-0.5 rounded  border  ${
				currentBill && currentBill.tempId == tempId
					? "border shadow"
					: "border-dashed"
			} `}
		>
			{modeRename ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						{...register("name")}
						autoFocus
						helperText={totals && moneyFormat(totals.BSF) + "bs"}
						errorText={errors.name && errors.name.message}
						onBlur={(e) => {
							setModeRename(false);
							handleSubmit(onSubmit)();
						}}
					/>
				</form>
			) : (
				<>
					<div className="pl-2">
						<Text>{name || user?.name || "Sin Nombre"}</Text>

						<div className="flex gap-2">
							<Text className="mr-2 text-right">
								{totals && moneyFormat(totals.BSF) + "bs"}
							</Text>
						</div>
					</div>

					<IconButton
						onClick={async (e) => {
							e.stopPropagation();
							setPopoverOpen((prev) => !prev);
						}}
						size="tiny"
						icon="DotsVertical"
					/>
					<Popover isOpen={popoverOpen} setIsOpen={setPopoverOpen}>
						<Button
							textJustify="left"
							onClick={async (e) => {
								e.stopPropagation();
								await handdleDelete();
							}}
							icon="Trash"
							variant="danger"
						>
							Eliminar
						</Button>
					</Popover>
				</>
			)}
		</div>
	);
}
