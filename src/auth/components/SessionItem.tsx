import { useNavigate } from "react-router-dom";
import { ISessionToken } from "../interfaces";
import useUser from "../hooks/useUser";
import RouterLinks from "../../common/config/RouterLinks";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";

interface props {
	data: ISessionToken;
}
const SessionItem = (props: props) => {
	const router = useNavigate();

	const { data } = props;
	const { user, pickSavedSession, removeSavedSession } = useUser({
		userId: data.userId,
	});

	if (!user) return <div>Loanding....</div>;

	const handleClick = async () => {
		try {
			await pickSavedSession(data);
			router(RouterLinks.Bills);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			onClick={handleClick}
			className="flex items-center pl-4 rounded border border-gray-200 hover:border-gray-600 cursor-pointer"
		>
			<Text className="mr-auto">
				{user.name} {user.lastname}
			</Text>
			<IconButton icon="Close" onClick={() => removeSavedSession(data)} />
		</div>
	);
};

export default SessionItem;
