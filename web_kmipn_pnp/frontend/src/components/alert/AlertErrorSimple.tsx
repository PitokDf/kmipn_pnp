export function AlertErrorSimple({ error }: { error: string }) {
    return (
        <div className="alert alert-error py-3 mb-4">
            {error}
        </div>
    );
}