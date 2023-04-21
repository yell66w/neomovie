import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { YOUTUBE_URL } from "@/constants";
import { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface Props {
  trailerKey?: string;
}

const Trailer = ({ trailerKey }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!!trailerKey && (
        <>
          <Button
            variant="secondary"
            onClick={() => setShowModal(true)}
            startIcon={<BsFillPlayFill size={16} />}
          >
            Watch Trailer
          </Button>
          {showModal ? (
            <Modal open={showModal && !!trailerKey} setOpen={setShowModal}>
              <iframe
                width="100%"
                height="100%"
                src={`${YOUTUBE_URL}/${trailerKey}?autoplay=true`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Modal>
          ) : null}
        </>
      )}
    </>
  );
};

export default Trailer;
