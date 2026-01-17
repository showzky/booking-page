export type DarkMode = 'light' | 'dark';
interface Props {
    mode: DarkMode;
    toggleMode: () => void;
}
export function DarkModeToggle({mode, toggleMode}: Props) {
    return (
        <button type="button" data-1p-ignore="true" onClick={toggleMode}>
            Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </button>
    );
}