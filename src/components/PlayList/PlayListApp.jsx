import React, { useState } from "react";
import { toast } from "react-toastify";

function PlayListApp() {
  const [playList, setPlayList] = useState([
    "Cơn mưa ngang qua",
    "Nắng ấm xa dần",
    "Bình yên",
    "Lạnh",
    "Vì yêu",
  ]);
  const [music, setMusic] = useState();

  const [selectIndex, setSelectIndex] = useState(-1);
  const [newMusic, setNewMusic] = useState();

  const handleCancleEdit = (music) => {
    setSelectIndex(-1);
    setNewMusic();
  };
  const handleUpdateMusic = (idx) => {
    if (newMusic) {
      playList[idx] = newMusic;
    }
    setNewMusic();
    setSelectIndex(-1);
    setPlayList(playList);
    toast.success("Music update success");
  };

  const handleAddMusic = (e) => {
    e.preventDefault();
    setPlayList([...playList, music]);
    setMusic("");
    toast.info("Music added success",{autoClose:1000,position:"bottom-right"});

  };
  const hanldRemoveMusic = (idx, music) => {
    // let newplayList = playList.filter((item, index) => index != idx);
    // setPlayList(newplayList);
    let confirm = window.confirm("Are you sure to delete this music?");
    if (confirm) {
      setPlayList((prev) => {
        let newplayList = prev.filter((item, index) => index != idx);
        return newplayList;
      });
    }
  };

  return (
    <div className="container mt-6">
      <h1 className="display-6 text-warning fw-bolder">
        PlayList Musics
        <i className="fa-solid fa-music ms-2"></i>
      </h1>
      <form onSubmit={handleAddMusic} className="w-75 mt-2">
        <div className="form-group d-flex">
          <input
            type="text"
            className="form-control w-50 me-1"
            required
            value={music}
            onInput={(e) => setMusic(e.target.value)}
          />
          <button type="submit" className="btn btn-sm btn-primary">
            <i className="fa-solid fa-add me-2"></i>
            Add to Playlist
          </button>
        </div>
      </form>
      <div className="w-75 mt-3">
        <ul className="list-group">
          {playList.map((song, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-item-center"
            >
              {selectIndex == index ? (
                <input
                  form="control"
                  value={newMusic || song}
                  onInput={(e) => setNewMusic(e.target.value)}
                />
              ) : (
                song
              )}
              <div className="d-plex">
                {selectIndex == index ? (
                  <>
                    <span
                      className="d-inline-block"
                      data-bs-toggle="tooltip"
                      title="Save"
                      onClick={() => handleUpdateMusic(index)}
                    >
                      <i
                        role="button"
                        className="fa-solid fa-floppy-disk me-2 text-warning"
                      ></i>
                    </span>
                    <span
                      className="d-inline-block"
                      data-bs-toggle="tooltip"
                      title="Cancel"
                      onClick={() => handleCancleEdit(music)}
                    >
                      <i
                        role="button"
                        className="fa-solid fa-rectangle-xmark me-2 text-dark"
                      ></i>
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="d-inline-block"
                      data-bs-toggle="tooltip"
                      title="Edit"
                      onClick={() => setSelectIndex(index)}
                    >
                      <i
                        role="button"
                        className="fa-solid fa-pen-to-square me-2 text-success"
                      ></i>
                    </span>
                    <span
                      className="d-inline-block"
                      data-bs-toggle="tooltip"
                      title="Delete"
                      onClick={() => hanldRemoveMusic(index, song)}
                    >
                      <i
                        role="button"
                        className="fa-solid fa-trash me-2 text-danger"
                      ></i>
                    </span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default PlayListApp;
