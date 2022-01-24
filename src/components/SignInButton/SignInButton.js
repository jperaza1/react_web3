import { useSelector, useDispatch } from 'react-redux';
import { changeChain, changeUserInfo } from '../../redux/actions/user/userAction';
import { shortAddr } from '../../utils/generals';

const SignInButton = () => { 
	const dispatch = useDispatch();
	const { isLogged, currentAccount, ensName } = useSelector((state) => state.user);

	return (
		<button 
			type="button" 
			disabled={isLogged} 
			className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
					{isLogged ? shortAddr(ensName, currentAccount) : "Connect"}
		</button>
	)
}

export default SignInButton;