'use client';
import { login } from "@/app/actions/actions";
import { useActionState } from "react";

export default function LoginForm() {
    const [state,action,pending] = useActionState(login,undefined)

    return (
        <form action={action} className="flex flex-col max-w-[325px] flex-grow bg-slate-300 rounded p-4 shadow gap-4">
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold">Inicio de sesion</h1>
                <h3 className="text-sm">Digite sus credenciales para acceder</h3>
            </div>
            <div className="flex flex-col">
                <label>Usuario</label>
                <input name="username" type="text" className="rounded p-1" minLength={4} required />
                {state?.errors?.username && <label className="text-red-800 text-xs">{state.errors.username}</label>}
            </div>
            <div className="flex flex-col">
                <label>Contraseña</label>
                <input name="password" type="password" className="rounded p-1" minLength={4} maxLength={8} required/>
                {state?.errors?.password && (
                    <div className="mt-2">
                        <p className="text-xs font-medium">La contraseña debe:</p>
                        <ul>
                            {state.errors.password.map((error) =>(
                                <li className="text-xs text-red-800" key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <button className="p-2 bg-slate-950 rounded text-slate-100 hover:opacity-85" disabled={pending} type="submit">Ingresar</button>
        </form>
    );
}