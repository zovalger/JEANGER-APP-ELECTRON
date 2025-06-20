import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ISaldoMovilnet } from "../interfaces/SaldoMovilnet.interface";
import { getSaldoMovilnet_Request } from "../api/ConsultMovilnet.api";
import Text from "./Text";
import Input from "./Input";
import IconButton from "./IconButton";
import Skeleton from "./Skeleton";

export default function ConsultMovilnet() {
	const [id] = useState(uuid());
	const [saldoMovilnet, setSaldoMovilnet] = useState<ISaldoMovilnet | null>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [value, setValue] = useState("");
	const [copy, setCopy] = useState(false);

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

	const copyToClipboard = async (text: string) => {
		await navigator.clipboard.writeText(text);
	};

	return (
		<div
			className="border-t mt-4 p-4"
			onSubmit={(e) => {
				e.preventDefault();
				handdleSubmit();
			}}
		>
			<label htmlFor={id}>
				<Text>Consulta Movilnet</Text>

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
			</label>
			<div className="flex items-center ">
				<label htmlFor={id}>
					<Text className="">Tlf.:</Text>
				</label>

				<Input
					id={id}
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
					icon={copy ? "ClipboardCheck" : "ClipboardCopy"}
					size="small"
					onClick={() => {
						setCopy(true);
						copyToClipboard(value.trim().replace(/^0/, ""));
						setTimeout(() => setCopy(false), 1000);
					}}
				/>

				<IconButton icon="Search" size="small" onClick={handdleSubmit} />
			</div>
		</div>
	);
}
