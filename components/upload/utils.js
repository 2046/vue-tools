export const isSameFile = (file1, file2) => {
	return file1.name == file2.name &&
			file1.size == file2.size &&
			file1.type == file2.type
}

