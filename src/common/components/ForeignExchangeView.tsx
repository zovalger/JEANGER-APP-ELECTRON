import { useState } from "react";
import IconButton from "./IconButton";
import Text from "./Text";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import Skeleton from "./Skeleton";
import useClipboard from "../hooks/useClipboard";

export default function ForeignExchangeView() {
	const { foreignExchange, forceScrapForeignExchange, loadingForeignExchange } =
		useForeignExchange();

	const [editMode, setEditMode] = useState(false);
	const { isCopy, copyToClipboard } = useClipboard();
	const { isCopy: isCopy2, copyToClipboard: copyToClipboard2 } = useClipboard();

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

	const Content = () => (
		<>
			<div className="flex gap-2">
				<div className="flex flex-1 items-center justify-between">
					<Text className="w-12" variant="bold">
						Dolar:
					</Text>
					<Text className="">{foreignExchange.dolar?.toFixed(2)} bs</Text>
				</div>

				<IconButton
					icon={isCopy ? "ClipboardCheck" : "ClipboardCopy"}
					size="small"
					onClick={async () =>
						await copyToClipboard(
							foreignExchange.dolar?.toString().replace(".", ",")
						)
					}
				/>
			</div>

			<div className="flex gap-2">
				<div className="flex flex-1 items-center justify-between">
					<Text className="w-12" variant="bold">
						Euro:
					</Text>
					<Text>{foreignExchange.euro?.toFixed(2)} bs</Text>
				</div>

				<IconButton
					icon={isCopy2 ? "ClipboardCheck" : "ClipboardCopy"}
					size="small"
					onClick={async () =>
						await copyToClipboard2(
							foreignExchange.euro?.toString().replace(".", ",")
						)
					}
				/>
			</div>

			<div className="flex  items-center justify-between pr-10">
				<Text className="w-12" variant="bold">
					Fecha:
				</Text>
				<Text>
					{new Date(foreignExchange.bankBusinessDate).toLocaleDateString()}
				</Text>
			</div>
		</>
	);

	return (
		<div className=" p-4">
			<div className="flex justify-between items-center">
				<Text className="mr-auto" variant="bold">
					Divisas
				</Text>
				{/* <IconButton size="small" onClick={toggleEditMode} icon="Edit" /> */}
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
