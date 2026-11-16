import { GetUsers } from '@/lib/api/user';

const AdminUserPage = async() => {
        const users = await GetUsers();
        console.log(users);
        return (
                <div>
                      <h2>Admin User Management</h2>  
                </div>
        );
};

export default AdminUserPage;