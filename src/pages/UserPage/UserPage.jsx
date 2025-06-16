import React , { useState }from 'react'
import UserHeader from '../../components/ui/Header/UserHeader';
import DreamCard from '../../components/ui/DreamCard/DreamCard';
const UserPage = () => {
    const [searchValue, setSearchValue] = useState('');

return (
    <>
        <UserHeader searchValue={searchValue} setSearchValue={setSearchValue} />
        <DreamCard searchValue={searchValue}/>
    </>
);
}
export default UserPage;