/** Roles held at one workplace, shown "A · B · C" on one line (see .role in index.css). */
export default function RoleList({ roles }: { roles: string[] }) {
    return (
        <>
            {roles.map((r) => (
                <span key={r} className="role">
                    {r}
                </span>
            ))}
        </>
    );
}
