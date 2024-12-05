export function AlertErrorSimple({ error }: { error: string }) {
    return (
        <div className="alert alert-error">
            {error}
        </div>
    );
}