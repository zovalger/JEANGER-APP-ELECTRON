import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ISaldoMovilnet } from "../interfaces/SaldoMovilnet.interface";
import { getSaldoMovilnet_Request } from "../api/ConsultMovilnet.api";
import Text from "./Text";
import Input from "./Input";
import IconButton from "./IconButton";
import Skeleton from "./Skeleton";
import useClipboard from "../hooks/useClipboard";

export default function ConsultMovilnet() {
	const [id] = useState(uuid());
	const { isCopy, copyToClipboard } = useClipboard();
	const [saldoMovilnet, setSaldoMovilnet] = useState<ISaldoMovilnet | null>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [value, setValue] = useState("");

	const handdleChange = (v: string) => setValue(v);

	const handdleSubmit = async () => {
		try {
			setError(null);

			if (!value) return;
			setLoading(true);

			const result = await getSaldoMovilnet_Request(value);

			setSaldoMovilnet(result);
		} catch (error) {
			console.log(error);
			setError("Error al obtener saldo");
		}

		setLoading(false);
	};

	const handdleClear = () => {
		setValue("");
		setSaldoMovilnet(null);
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
						onClick={() => copyToClipboard(value.trim().replace(/^0/, ""))}
					/>

					<IconButton icon="Search" size="small" onClick={handdleSubmit} />
				</div>
				{error ? (
					<Text>{error}</Text>
				) : loading ? (
					<div className="space-y-1">
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</div>
				) : (
					saldoMovilnet && (
						<div>
							<Text>{saldoMovilnet.saldo}</Text>
							<Text>{saldoMovilnet.status}</Text>
							<Text>{saldoMovilnet.date}</Text>
						</div>
					)
				)}
			</div>
		</label>
	);
}
