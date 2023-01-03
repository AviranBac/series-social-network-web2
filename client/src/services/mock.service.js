const totalElements = 152;
const content =  Array.from({length: totalElements}, (_, i) => i + 1)
    .map(index => ({ a: index, b: index, c: index, d: index, e: index }));
export const mockResponse = {
    content,
    totalPages: Math.ceil(totalElements / 10),
    totalElements
}