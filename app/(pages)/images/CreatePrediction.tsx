import React, { useState } from 'react';
import { useMutation } from '@/app/hooks';
import { predictions } from '@/app/utils/data';
import { Dialog } from '@/app/shared';

function CreatePrediction(props: DialogProps) {
  const { isOpen, onClose, selectedId } = props;

  const [states, setStates] = useState<DialogForm>({
    title: '',
    description: ''
  });
  const [post, { loader, error }] = useMutation();
  const { title, description } = states;

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setStates({ ...states, [name]: value });
  }

  async function handleSubmit() {
    console.log(states);
    await post('prediction', { ...states, imgId: selectedId, predictions: predictions });
    onClose();
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="model-content">
        {error && <div>{error}</div>}
        {loader && <div>Loading...</div>}
        {!loader && (
          <>
            <h3>Create Prediction</h3>
            <input name="title" placeholder="Enter Title" value={title} onChange={handleChange} />
            <textarea
              name="description"
              placeholder="Enter Description"
              value={description}
              rows={4}
              onChange={handleChange}
            ></textarea>
            <div className="flex-row-end">
              <button onClick={onClose} disabled={loader}>
                Cancel
              </button>
              <button disabled={!title || !description || loader} onClick={handleSubmit}>
                submit
              </button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default CreatePrediction;

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string;
  children?: React.ReactNode;
}

interface DialogForm {
  title: string;
  description: string;
}
