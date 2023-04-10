import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function UserModal(props) {
  const [username, setUsername] = useState('');
  const [lastname, setLastName] = useState('');
  const [error, setError] = useState('');

  const { isOpen, btnTitle, onClose, onSubmitAction, editUserId } = props;

  async function onsubmit() {
    if (!username) {
      setError('Хэрэглэгчийн нэр хоосон!!');
      return;
    }

    if (!lastname) {
      setError('Хэрэглэгчийн овог хоосон!!');
      return;
    }

    // Edit, Hadgalah
    await onSubmitAction(username, lastname);
    setUsername('');
    setLastName('');
  }

  useEffect(() => {
    if (editUserId) {
      // GET /users/:id
      axios.get(`${BACKEND_URL}/users/${editUserId}`).then((res) => {
        setUsername(res.data.username);
        setLastName(res.data.lastname);
      });
    }
  }, [editUserId]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex mt-10 justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Хэрэглэгчийн мэдээлэл бүртгэх
                </Dialog.Title>
                <div className="mt-4">
                  <section className="flex flex-col">
                    <label htmlFor="">Хэрэглэгчийн нэр</label>
                    <input
                      className="border border-black rounded py-1 px-2 mt-1.5"
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError('');
                      }}
                    />
                  </section>
                  <section className="flex flex-col mt-2">
                    <label htmlFor="">Хэрэглэгчийн овог</label>
                    <input
                      type="text"
                      className="border border-black rounded py-1 px-2 mt-1.5"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setError('');
                      }}
                    />
                  </section>
                </div>
                {error && (
                  <div className="w-full mt-2 flex justify-center items-center">
                    <h3 className="text-red-700">{error}</h3>
                  </div>
                )}
                <div className="mt-4 flex w-full justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onsubmit}
                  >
                    {btnTitle}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setLastName('');
                      setUsername('');
                      setError('');
                      onClose();
                    }}
                  >
                    Буцах
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default UserModal;
