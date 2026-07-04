import { useState } from "react";
import { v4 as uuid } from "uuid";
import Text from "./Text";
import Input from "./Input";
import IconButton from "./IconButton";
import Skeleton from "./Skeleton";
import useClipboard from "../hooks/useClipboard";
import useUtils from "../hooks/useUtils";
import { IMovilnetBalance } from "../interfaces/SaldoMovilnet.interface";

export default function ConsultMovilnet() {
	// todo: guardar estado en zustand
	const { getSaldoMovilnet } = useUtils();

	const [id] = useState(uuid());
	const { isCopy, copyToClipboard } = useClipboard();
	const [saldoMovilnet, setSaldoMovilnet] = useState<IMovilnetBalance | null>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [value, setValue] = useState("");

	const handdleChange = (v: string) => setValue(v);

	const startRequest = async () => {
		try {
			const result = await getSaldoMovilnet(value);

			setSaldoMovilnet(result);
		} catch (error) {
			console.log(error);

			setError("Error al obtener saldo, reintentando.......");

			await startRequest();
		}
	};

	const handdleSubmit = async () => {
		setError(null);

		if (loading) return;
		if (!value) return;

		setLoading(true);

		await startRequest();

		setLoading(false);
		setError(null);
	};

	const handdleClear = () => {
		setValue("");
		setSaldoMovilnet(null);
		setLoading(false);
		setError(null);
	};

	return (
		<label htmlFor={id}>
			<div
				className="mt-4 p-4"
				onSubmit={(e) => {
					e.preventDefault();
					handdleSubmit();
				}}
			>
				<Text variant="bold">Consulta Movilnet</Text>

				<div className="flex items-center ">
					<Text className="">Tlf.:</Text>

					<Input
						id={id}
						inputVariant="without-border"
						type="tel"
						placeholder="Número"
						autoComplete="none"
						name="tlf"
						onKeyDown={(event) => {
							event.stopPropagation();
							if (event.key === "Escape") handdleClear();
							if (event.key === "Enter") handdleSubmit();
						}}
						value={value || ""}
						onChange={({ target: { value } }) => handdleChange(value)}
					/>

					<IconButton
						icon={isCopy ? "ClipboardCheck" : "ClipboardCopy"}
						size="small"
						onClick={() => copyToClipboard(value.trim())}
					/>

					<IconButton icon="Search" size="small" onClick={handdleSubmit} />
				</div>

				{error && <Text>{error}</Text>}

				{loading && (
					<div className="space-y-1">
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</div>
				)}

				{saldoMovilnet && !error && !loading && (
					<div>
						<Text>{saldoMovilnet.saldo}</Text>
						<Text>{saldoMovilnet.status}</Text>
						<Text>{saldoMovilnet.date}</Text>
					</div>
				)}
			</div>
		</label>
	);
}
