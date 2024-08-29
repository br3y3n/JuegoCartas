import { useState } from 'react';
import Modal from 'react-modal';
import UnirsePresala from '../Components/unirsePresala';


Modal.setAppElement('#root');

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('crear');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <img className='flex' src='../../public/img/logoPokemon3.png'/>
                <ul>
                    <li
                        className={`cursor-pointer py-2 px-4 rounded ${activeTab === 'crear' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveTab('crear')}
                    >
                        Crear sala
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 rounded ${activeTab === 'unirse' ? 'bg-gray-600' : ''}`}
                        onClick={() => {
                            setActiveTab('unirse');
                            openModal();
                        }}
                    >
                        Unirse a sala

                    </li>
                </ul>
            </div>
            <div className="w-3/4 p-4">
                {activeTab === 'crear' && <h1 className="text-2xl">Crear Sala</h1>}
                {activeTab === 'unirse' && <h1 className="text-2xl">Unirse a Sala</h1>}
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Unirse a Sala"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-96"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-xl font-bold mb-4">Unirse a Sala</h2>
                <UnirsePresala/>
                <button
                    className="mt-4 bg-gray-600 text-white py-2 px-4 rounded"
                    onClick={closeModal}
                >
                    Cerrar
                </button>
            </Modal>
        </div>
    );
};

export default Dashboard;
