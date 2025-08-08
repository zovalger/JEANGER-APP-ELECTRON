import { useEffect, useState } from "react";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import StopwatchItem from "../components/StopwatchItem";
import useStopwatch from "../hooks/useStopwatch";
import StopwatchForm from "../components/StopwatchForm";
import Modal from "../../common/components/Modal";
import IconButton from "../../common/components/IconButton";

export default function StopwatchScreen() {
	const { stopwatches, getAllStopwatch } = useStopwatch();

	const [openStopwatchForm, setOpenStopwatchForm] = useState(false);
	// const [editing, setEditing] = useState(false);

	useEffect(() => {
		getAllStopwatch()
			.then()
			.catch((err) => console.log(err));
	}, []);

	return (
		<PageTemplateLayout
			name="Cronometros"
			rightButtons={[
				// <IconButton
				// 	icon="Edit"
				// 	onClick={() => {
				// 		setEditing(!editing);
				// 	}}
				// />,
				<IconButton
					icon="Plus"
					onClick={() => {
						setOpenStopwatchForm(true);
					}}
				/>,
			]}
		>
			<div className="flex flex-wrap gap-4">
				{stopwatches.map((t) => (
					<StopwatchItem key={t._id} data={t} />
				))}
			</div>

			<Modal
				visible={openStopwatchForm}
				onClose={() => setOpenStopwatchForm(false)}
			>
				<StopwatchForm successCallback={() => setOpenStopwatchForm(false)} />
			</Modal>
		</PageTemplateLayout>
	);
}
