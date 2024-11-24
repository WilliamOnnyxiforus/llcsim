import PersonIcon from '@mui/icons-material/Person';

const users = (id) => {
    const formName = id === 'new' ? "New user form" : "Edit user form"

    return ({
        formNameTitle: formName,
        breadcrumbs: [{
            label: "Users",
            href: "/users",
            icon: <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        }, {
            label: formName
        }],

        formData: {
            id: id,
            name: '',
            email: '',
            placeOfBirth: '',
            dateOfBirth: '',
            address: '',
            phone: '',
        }
    })
}

export const formComponents = (formName, id) => {
    if (formName === "users") {
        return users(id);
    }
}