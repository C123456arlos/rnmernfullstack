export const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() +text.slice(1)
}
export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})
}
export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered':
            return '#10b981'
        case 'shipped':
            return '#3b82f6'
        case 'pending':
            return '#f59e0b'
        default:
            return '#666'
    }
}