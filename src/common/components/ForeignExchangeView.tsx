import { useState } from "react";
import IconButton from "./IconButton";
import Text from "./Text";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import Skeleton from "./Skeleton";

export default function ForeignExchangeView() {
	const { foreignExchange, forceScrapForeignExchange, loadingForeignExchange } =
		useForeignExchange();

	const [editMode, setEditMode] = useState(false);
	const [copy, setCopy] = useState(false);
	const [copy2, setCopy2] = useState(false);

	const toggleEditMode = () => setEditMode(!editMode);

	// const formik = useFormik({
	// 	initialValues: { euro: 0, dolar: 0, date: new Date() },
	// 	validationSchema: Yup.object({
	// 		euro: Yup.number().positive().required(),
	// 		dolar: Yup.number().positive().required(),
	// 	}),
	// 	onSubmit: async (data) => {
	// 		const res = await setForeignExchangeRequest({
	// 			...data,
	// 			date: new Date(),
	// 		});

	// 		await refreshForeignExchange();
	// 		toggleEditMode();
	// 	},
	// });

	const copyToClipboard = async (text: string) => {
		await navigator.clipboard.writeText(text);
	};

	const Content = () => (
		<>
			<div className="flex items-center gap-2">
				<Text className="w-12" variant="bold">
					Dolar:{" "}
				</Text>
				<Text className="">{foreignExchange.dolar?.toFixed(2)} bs</Text>

				<IconButton
					icon={copy ? "ClipboardCheck" : "ClipboardCopy"}
					size="small"
					onClick={async () => {
						setCopy(true);
						setTimeout(() => setCopy(false), 800);
						await copyToClipboard(
							foreignExchange.dolar?.toString().replace(".", ",")
						);
					}}
				/>
			</div>

			<div className="flex items-center gap-2">
				<Text className="w-12" variant="bold">
					Euro:{" "}
				</Text>
				<Text className="">{foreignExchange.euro?.toFixed(2)} bs</Text>

				<IconButton
					icon={copy2 ? "ClipboardCheck" : "ClipboardCopy"}
					size="small"
					onClick={async () => {
						setCopy2(true);
						setTimeout(() => setCopy2(false), 800);
						await copyToClipboard(
							foreignExchange.euro?.toString().replace(".", ",")
						);
					}}
				/>
			</div>

			<div className="flex items-center gap-2">
				<Text className="w-12" variant="bold">
					Fecha:
				</Text>
				<Text>{foreignExchange.bankBusinessDate}</Text>
			</div>
		</>
	);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<Text className="mr-auto">Divisas</Text>
				<IconButton size="small" onClick={toggleEditMode} icon="Edit" />
				<IconButton
					size="small"
					onClick={forceScrapForeignExchange}
					icon="Refresh"
				/>
			</div>

			{editMode ? (
				<>
					{/* <Input
						type="number"
						name="dolar"
						value={formik.values.dolar}
						onChange={formik.handleChange}
					/>

					<Input
						type="number"
						name="euro"
						value={formik.values.euro}
						onChange={formik.handleChange}
					/>

					<Button onClick={() => formik.submitForm()}>Cambiar</Button> */}
				</>
			) : (
				<>
					{foreignExchange && !loadingForeignExchange ? (
						<Content />
					) : (
						<div className="">
							<div className="flex items-center gap-2">
								<Text variant="bold" className="w-12">
									Dolar:
								</Text>
								<Skeleton size="quarter" />
							</div>

							<div className="flex items-center gap-2">
								<Text variant="bold" className="w-12">
									Euro:{" "}
								</Text>
								<Skeleton size="quarter" />
							</div>

							<div className="flex items-center gap-2">
								<Text variant="bold" className="w-12">
									Fecha:
								</Text>
								<Skeleton size="quarter" />
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
