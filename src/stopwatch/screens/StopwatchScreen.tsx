import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import ClockItem from "../components/ClockItem";
import useStopwatch from "../hooks/useStopwatch";

export default function StopwatchScreen() {
	const { stopwatches } = useStopwatch();

	// const [openStopwatchForm, setOpenStopwatchForm] = useState(false);
	// const [editing, setEditing] = useState(false);

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
					<ClockItem key={t._id} data={t} />
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
