import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import { convertirHoraAMPM } from "../../utils/ConvertirHora";
interface Horario {
    id: number;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
}

interface Props {
    horarios: Horario[];
}

export default function Index({ horarios }: Props) {
    const [dia, setDia] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalE, setShowModalE] = useState(false);
    const [idM, setIdM] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [show, setShow] = useState(true);

    const eliminar = (id: number) => {
        router.delete(route("horarios.destroy", { id }), {
            onSuccess: () => {
                setShowModalE(false);
                setIdM(null);
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            route("horarios.store"),
            { dia, hora_inicio: horaInicio, hora_fin: horaFin },
            {
                onSuccess: () => {
                    setDia("");
                    setHoraInicio("");
                    setHoraFin("");
                    setShowModal(false);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Horarios
                </h2>
            }
        >
            <Head title="Horarios" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Listado de Horarios
                            </h1>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Agregar Horario
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">
                                            ID
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Día
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Hora Inicio
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Hora Fin
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {horarios.map((e) => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-2">
                                                {e.id}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.dia}
                                            </td>
                                            <td className="px-4 py-2">
                                                {convertirHoraAMPM(
                                                    e.hora_inicio
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {convertirHoraAMPM(e.hora_fin)}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => {
                                                        setShowModalE(true);
                                                        setIdM(e.id);
                                                    }}
                                                    className="bg-red-500 rounded text-white px-4 py-2 hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Modal para crear horario */}
                        <Modal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                            maxWidth="lg"
                        >
                            <form onSubmit={handleSubmit} className="mb-6">
                                <div className="flex flex-col p-6">
                                    <div>
                                        <label htmlFor="">Dias</label>
                                        <TextInput
                                            type="text"
                                            className="border rounded px-4 py-2 w-full mb-2"
                                            placeholder="Días (ej: Lunes a Viernes)"
                                            value={dia}
                                            onChange={(e) =>
                                                setDia(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="">Hora inicio</label>
                                        <TextInput
                                            type="time"
                                            className="border rounded px-4 py-2 w-full mb-2"
                                            value={horaInicio}
                                            onChange={(e) =>
                                                setHoraInicio(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                            <label htmlFor="">Hora Final</label>
                                    <TextInput
                                        type="time"
                                        className="border rounded px-4 py-2 w-full mb-2"
                                        value={horaFin}
                                        onChange={(e) =>
                                            setHoraFin(e.target.value)
                                        }
                                        required
                                    />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal>

                        {/* Modal para eliminar horario */}
                        <Modal
                            show={showModalE}
                            onClose={() => setShowModalE(false)}
                            maxWidth="lg"
                        >
                            <div className="p-6">
                                <p>
                                    ¿Estas seguro que deseas eliminar este
                                    horario? Esta acción no se puede deshacer.
                                </p>
                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModalE(false)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!isSubmitting) {
                                                setIsSubmitting(true);
                                                eliminar(idM!);
                                                setTimeout(() => {
                                                    setShowModalE(false);
                                                    setIsSubmitting(false);
                                                }, 900);
                                            }
                                        }}
                                        type="submit"
                                        className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${
                                            isSubmitting
                                                ? "opacity-75 cursor-not-allowed"
                                                : ""
                                        }`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Eliminando..."
                                            : "Eliminar"}
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
