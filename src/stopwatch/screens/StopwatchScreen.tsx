import { useEffect } from "react";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import StopwatchItem from "../components/StopwatchItem";
import useStopwatch from "../hooks/useStopwatch";

export default function StopwatchScreen() {
	const { stopwatches, getAllStopwatch } = useStopwatch();

	// const [openStopwatchForm, setOpenStopwatchForm] = useState(false);
	// const [editing, setEditing] = useState(false);

	useEffect(() => {
		getAllStopwatch()
			.then()
			.catch((err) => console.log(err));
	}, []);

	return (
		<PageTemplateLayout
			name="Cronometros"
			rightButtons={
				<>
					{/* <IconButton
						icon="Edit"
						onClick={() => {
							setEditing(!editing);
						}}
					/> */}

					{/* <IconButton
					icon="Plus"
						onClick={() => {
							setOpenStopwatchForm(true);
						}}
					>
			
					</IconButton> */}
				</>
			}
		>
			<div>
				{stopwatches.map((t) => (
					<StopwatchItem key={t._id} data={t} />
				))}
			</div>

			{/* {openStopwatchForm && (
				<StopwatchForm
					open={openStopwatchForm}
					setOpen={setOpenStopwatchForm}
				/>
			)} */}
		</PageTemplateLayout>
	);
}
