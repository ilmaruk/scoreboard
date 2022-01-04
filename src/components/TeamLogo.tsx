export const TeamLogo = ({ label, onClick }: { label: string, onClick: () => void }) => {
    return (
        <>
        <button onClick={onClick}>{label}</button>
        </>
    );
}
