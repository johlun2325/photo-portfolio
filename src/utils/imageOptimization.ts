export const getOptimizedImageUrl = (url: string, width: number) => {
    return url.replace('/upload/', `/upload/w_${width},c_scale,q_auto,f_auto/`);
  };