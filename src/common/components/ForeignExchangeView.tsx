import { useState } from "react";
import IconButton from "./IconButton";
import Text from "./Text";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";

export default function ForeignExchangeView() {
	const { foreignExchange, forceScrapForeignExchange } = useForeignExchange();

	const [editMode, setEditMode] = useState(false);
	const [copy, setCopy] = useState(false);
	const [copy2, setCopy2] = useState(false);

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

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

	return (
		<div>
			<div>
				<Text>Divisas</Text>
				<IconButton onClick={toggleEditMode} icon="Edit" />
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
					<div>
						<div>
							<div>
								<Text>
									<strong>Dolar: </strong>
									{foreignExchange && foreignExchange.dolar?.toFixed(2)}
								</Text>

								{foreignExchange && (
									// <CopyToClipboard
									// 	text={foreignExchange.dolar?.toString().replace(".", ",")}
									// 	onCopy={() => {
									// 		setCopy(true);

									// 		setTimeout(() => setCopy(false), 1000);
									// 	}}
									// >
									<IconButton
										icon={copy ? "ClipboardCheck" : "ClipboardCopy"}
									/>
									// </CopyToClipboard>
								)}
							</div>

							<div>
								<Text>
									<strong>Euro: </strong>
									{foreignExchange && foreignExchange.euro?.toFixed(2)}
								</Text>

								{foreignExchange && (
									// <CopyToClipboard
									// 	text={foreignExchange.euro?.toString().replace(".", ",")}
									// 	onCopy={() => {
									// 		setCopy2(true);

									// 		setTimeout(() => setCopy2(false), 1000);
									// 	}}
									// >
									<IconButton
										icon={copy ? "ClipboardCheck" : "ClipboardCopy"}
									/>
									// </CopyToClipboard>
								)}
							</div>
						</div>

						<IconButton onClick={forceScrapForeignExchange} icon="Refresh" />
					</div>

					<div>
						<Text>
							<b>Fecha:</b>
							{foreignExchange &&
								` ${new Date(
									foreignExchange.bankBusinessDate
								).toLocaleDateString()}`}
						</Text>
					</div>
				</>
			)}
		</div>
	);
}
