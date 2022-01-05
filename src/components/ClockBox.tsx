import { Clock, formatTime } from "../clock"

export const ClockBox = ({ clock, onClick }: { clock: Clock,  onClick: () => void }) => {
    return (
        <>
        <div id="clock" onClick={onClick} title="Click to toggle the clock">{formatTime(clock)}</div>
        </>
    )
}