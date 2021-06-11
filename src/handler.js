const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};
const getNotesHandler = (request, h) => {
  const { id } = request.params;
  const data = id ? {
    note: notes.find((v) => v.id === id),
  } : { notes };
  if (id && !data) {
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const response = h.response({
    status: 'success',
    data,
  });
  response.code(200);
  return response;
};
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const data = request.payload;
  const index = notes.findIndex((v) => v.id === id);
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const updatedAt = new Date().toISOString();
  notes[index] = { ...notes[index], ...data, updatedAt };
  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbaharui',
  });
  response.code(200);
  return response;
};
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((v) => v.id === id);
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  notes.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  addNoteHandler, getNotesHandler, editNoteByIdHandler, deleteNoteByIdHandler,
};
