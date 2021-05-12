const URL = 'https://fechallenge.dev.bhyve.io/user/'

export const fetchData = (param) => {
    return fetch(URL + param, {
        headers: {
            "Content-Type" : "application/json; charset=utf-8",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    })
}

export const Auth = (param, data) => {
    return fetch(URL + param, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            username: data.email,
            password: data.password
        })
    })
}

export const PostUserData = (param, data) => {
    return fetch(URL + param, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json; charset=utf-8",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName
        })
    })
}

export const PostUserSkills = (param, data) => {
    return fetch(URL + param, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json; charset=utf-8",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            skills: data.selectedSkills
        })
    })
}

export const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
}